from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import userSerializer
from .models import User, Profile
from .serializers import ProfileSerializer
from stations.serializers import BicisSerializer
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser)
# from rest_framework.permissions import (IsAuthenticated)
from core.permissions import IsAdmin

class UserView(viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    def register(self, request):
        # return Response("serializer")
        data = request.data['user']

        serializer_context = {
            'username': data['username'],
            'email': data['email'],
            'password': data['password']
        }

        serializer = userSerializer.register(serializer_context)
        ProfileSerializer.create(context=serializer['user'])
        return Response(serializer)

    def login(self, request):
        data = request.data['user']

        serializer_context = {
            'username': data['username'],
            'password': data['password']
        }
        
        serializer = userSerializer.login(serializer_context)
        return Response(serializer)

class UserInfoView(viewsets.GenericViewSet):
    # permission_classes = (IsAuthenticated,)
    # permission_classes = [IsAuthenticated]
    def getUser(self, request):
        
        bearer = request.headers['Authorization'].split()
        serializer_context = {
            'token': bearer[1]
        }
        # return print(bearer) 
        serializer = userSerializer.getUser(
        context=serializer_context)

        return Response(serializer)

    def refreshToken(self, request):
        username = request.user
        serializer_context = { 'username': username }
        serializer = userSerializer.refreshToken(serializer_context)
        return Response(serializer)

    def getUserBici(self, request):
        username = request.user
        serializer_context = { 'username': username }
        serializer = BicisSerializer.getUserBici(context=serializer_context)
        return Response(BicisSerializer.to_Bici(serializer))

    def logout(self, request):
        return Response()

class UserAdminView(viewsets.GenericViewSet):
    # permission_classes = (IsAdmin,)

    def getAllUsers(self, request):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = userSerializer.usertoken(
        context=serializer_context_user)
        if serializer_user[2] == 'admin':
            users = User.objects.all()
            users_serializer = userSerializer(users, many=True)
        return Response(users_serializer.data)

    def delete(self, request, uuid):
        bearer = request.headers['Authorization'].split()
        serializer_context_user = {
            'token': bearer[1]
        }
        serializer_user = userSerializer.usertoken(
        context=serializer_context_user)
        if serializer_user[2] == 'admin':
            user = User.objects.get(uuid=uuid)
            user.delete()
        return Response({'data': 'User deleted successfully'})

class ProfileView(viewsets.GenericViewSet):
    # permission_classes = (IsAuthenticated,)

    def getProfile(self, request, id):
        profile = Profile.objects.get(user_id=id)
        profile_serializer = ProfileSerializer(profile, many=False)
        return Response(profile_serializer.data)

    def put(self, request, id):
        current_user = request.user
        data_user = request.data.get('user')
        data_profile = request.data.get('profile')
        serializer_profile = ProfileSerializer.update(current_user=current_user, user_context=data_user, profile_context=data_profile)
        return Response(serializer_profile)
  
    def getStats(self, request, id):
        current_user = request.user
        serializer = ProfileSerializer.getStats(current_user=current_user, id=id)
        return Response(serializer)