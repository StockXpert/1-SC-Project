import 'package:stockxpertapp1/models/loginModel.dart';

abstract class LoginState {}

class LoginInitial extends LoginState {}

class LoginLoading extends LoginState {}

class LoginSuccess extends LoginState {
  final loginModel loginmodel;

  LoginSuccess(this.loginmodel);
}

class LoginError extends LoginState {
  final String error;
  LoginError(this.error);
}
