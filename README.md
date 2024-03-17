# 1-SC-Project
# Backend
# login 
localhost:3000/Users/login
# input
body
{
    "email":"...",
    "password":"..."
} 
# output
In case of success 
body
{
    "response":"success of login", (status 200)
    "jwt":"..."
}
In case of echec
body
{
    "response": "not existing account"(status 404) or response: "Password error"(status 404) 
    or "response": "Internal server error" status(500)
}
#forgot password
localhost:3000/Users/forgotPassword
#input
body
{
   "email":
}
#output
success case:
'Un e-mail de réinitialisation de mot de passe a été envoyé.'
echec case:
body
{
    "response": "Internal server error" status(500)
}
#change password (case of forgot)
localhost:3000/Users/changePasswordMail
#input
body
{
   "email",
   "code", 
   "newPassword"
}
#output
in case of success
body
{
  "response": 'password changed with success'
}
in case of echec
body
{
    "response":'internal error' or 'code invalid'
}
#change password (case of the user is connected)
localhost:3000/Users/changePasswordAuth
#input
header
{
    "Authorization":jwt
}
body
{
    "newPassword"
}
#output
in case of success
body
{
  "response": 'password changed with success'
}
in case of echec
body
{
    "response":'internal error' or 'code invalid'
}