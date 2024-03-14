# 1-SC-Project
# Backend
# login 
localhost:300/Users/login
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
