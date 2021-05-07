# Micro-Service-for-authentication

1. Only localhost:3000 can connect to localhost:3001

2. "/register" as POST request with {user,pass} will respond :
{auth:false,message:"Successfully Registed !"} when the registration is successful
"Nice try but we wont let you in!" When you try to access from post man or other server try to contact

3. "login" post {user,pass}
