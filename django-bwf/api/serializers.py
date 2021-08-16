from rest_framework import serializers
from .models import Group, Event, UserProfile, GroupMember, GroupChat, Bet
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.db.models import Sum
from django.utils import timezone

class ChangePasswordSerializer(serializers.Serializer):
  old_password = serializers.CharField(required=True)
  new_password = serializers.CharField(required=True)

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserProfile
    fields = ('id', 'image', 'is_premium', 'bio')

class UserSerializer(serializers.ModelSerializer):
  profile = UserProfileSerializer()
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password', 'profile')
    extra_kwargs = {'password': {'write_only': True, 'required': False}}
  def create(self, validated_data):
    profile_data = validated_data.pop('profile')
    user = User.objects.create_user(**validated_data)
    UserProfile.objects.create(user=user, **profile_data)
    Token.objects.create(user=user)
    return user

class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = ('id','team1', 'team2', 'time', 'group')

class BetSerializer(serializers.ModelSerializer):
  user = UserSerializer(many=False)
  class Meta:
    model = Bet
    fields = ('id','user', 'event','score1', 'score2', 'points')

class EventFullSerializer(serializers.ModelSerializer):
  bets = serializers.SerializerMethodField()
  is_admin = serializers.SerializerMethodField()
  count_bets = serializers.SerializerMethodField()
  class Meta:
    model = Event
    fields = ('id','team1', 'team2', 'time', 'score1', 'score2', 'group', 'bets', 'is_admin', 'count_bets')

  def get_count_bets(self, obj):
    num_bets = Bet.objects.filter(event=obj).count()
    return num_bets

  def get_bets(self, obj):
    if obj.time < timezone.now():
      bets = Bet.objects.filter(event=obj)
    else:
      user = self.context['request'].user
      bets = Bet.objects.filter(event=obj, user=user)
    serializer = BetSerializer(bets, many=True)
    return serializer.data

  def get_is_admin(self, obj):
    try:
      user = self.context['request'].user
      member = GroupMember.objects.get(group=obj.group, user=user)
      return member.admin
    except:
      return None

class GroupChatSerializer(serializers.ModelSerializer):
  class Meta:
    model = GroupChat
    fields = ('user', 'group','text_message', 'time')

class GroupMemberSerializer(serializers.ModelSerializer):
  user = UserSerializer(many=False)
  class Meta:
    model = GroupMember
    fields = ('user', 'group', 'admin')

class GroupSerializer(serializers.ModelSerializer):

  class Meta:
    model = Group
    fields = ('id', 'name', 'description', 'location', 'members_count')

class GroupFullSerializer(serializers.ModelSerializer):
  events = EventSerializer(many=True)
  members = serializers.SerializerMethodField()
  messages = serializers.SerializerMethodField()

  class Meta:
    model = Group
    fields = ('id', 'name', 'description', 'location', 'events', 'members', 'messages')

  def get_messages(self, obj):
    messages = GroupChat.objects.filter(group=obj).order_by('-time')
    serializer = GroupChatSerializer(messages, many=True)
    return serializer.data

  def get_members(self, obj):
    people_points = []
    members = obj.members.all()

    for member in members:
      points = Bet.objects.filter(event__group=obj, user=member.user.id).aggregate(pts=Sum('points'))
      member_serialized = GroupMemberSerializer(member, many=False)
      member_data = member_serialized.data
      member_data['points'] = points['pts'] or 0
        
      people_points.append(member_data)

    return people_points