class loginModel {
  String? response;
  String? jwt;
  String? role;
  UserData? data;
  loginModel({this.response, this.jwt, this.data, this.role});
  loginModel.fromJson(Map<String, dynamic> json) {
    response = json['response'];
    jwt = json['jwt'];
    role = json["role"];

    data = json['data'] != null ? UserData.fromJson(json['data']) : null;
  }
}

class UserData {
  String? email;
  String? response;
  String? jwt;
  String? role;
  String? permissions;
  // UserData({this.response, this.jwt, this.role, this.permissions, this.email});
  UserData.fromJson(Map<String, dynamic> json) {
    response = json['response'];
    jwt = json['jwt'];
    role = json["role"];
    permissions = json['permissions'];
    email = json['email'];
  }
}
