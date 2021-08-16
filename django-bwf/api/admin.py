from django.contrib import admin
from .models import Group, Event, UserProfile, GroupMember, GroupChat, Bet

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
  fields = ('user', 'image', 'bio', 'is_premium')
  list_display = ('id', 'user', 'image','is_premium')
@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
  fields = ('name', 'location', 'description')
  list_display = ('id','name', 'location', 'description')
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
  fields = ('team1', 'team2', 'time', 'score1', 'score2', 'group')
  list_display = ('id','team1', 'team2', 'time', 'score1', 'score2', 'group')
@admin.register(GroupMember)
class GroupMemberAdmin(admin.ModelAdmin):
  fields = ('user', 'group', 'admin')
  list_display = ('user', 'group', 'admin')
@admin.register(GroupChat)
class GroupChatAdmin(admin.ModelAdmin):
  fields = ('user', 'group', 'text_message')
  list_display = ('user', 'group', 'text_message', 'time')
@admin.register(Bet)
class BetAdmin(admin.ModelAdmin):
  fields = ('user', 'event','score1', 'score2', 'points')
  list_display = ('id','user', 'event','score1', 'score2', 'points')