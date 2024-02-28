import jwt

from django.conf import settings

from rest_framework import authentication, exceptions

from .models import User

class JWTAuthentication(authentication.BaseAuthentication):
    authentication_header_prefix = 'Bearer'

    def authenticate(self, request):
         # return print( 'authentication_header_prefix')
        request.user = None
        auth_header = authentication.get_authorization_header
        auth_header_prefix = self.authentication_header_prefix.lower()
        # return print(authentication.get_authorization_header)
        # if not auth_header:
        #     # return None
        #     return print('dentro del primer if')

        # if len(auth_header) == 1:
        #         # Invalid token header. No credentials provided. Do not attempt to
        #         # authenticate.
        #         return None
        #         # return print('dentro del segundo if')

        # elif len(auth_header) > 2:
        #     # Invalid token header. Token string should not contain spaces. Do
        #     # not attempt to authenticate.
        #     return None
            # return print('dentro del segundo if dentro del elsif')
            # return print('dentro del segundo if')
        # return print('fuera de los if')
        # prefix = auth_header[0].decode('utf-8')
        # token = auth_header[1].decode('utf-8')
        # return print(auth_header)
        # return print(auth_header_prefix)
    #     if prefix != self.authentication_header_prefix:
    #         return None

    #     return self._authenticate_credentials(request, token)

    # def _authenticate_credentials(self, request, token):
    #     token = len(User.objects.filter(token=token))
    #     return (token)
        # if (token > 0):
        #     msg = 'Token in User'
        #     raise exceptions.AuthenticationFailed(msg)
        # try:
        #     payload = jwt.decode(token, settings.SECRET_KEY)
        # except:
        #     msg = 'Invalid authentication. Could not decode token.'
        #     raise exceptions.AuthenticationFailed(msg)

        # try:
        #     user = User.objects.get(username=payload['username'])
        # except User.DoesNotExist:
        #     msg = 'No user matching this token was found.'
        #     raise exceptions.AuthenticationFailed(msg)

        # if not user.is_active:
        #     msg = 'This user has been deactivated.'
        #     raise exceptions.AuthenticationFailed(msg)
        # return (user, token)