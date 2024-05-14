import 'dart:ffi';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stockxpertapp1/Cubit/states.dart';
import 'package:stockxpertapp1/network/DioHelper.dart';
import 'package:stockxpertapp1/network/en_point.dart';

class LoginCubit extends Cubit<LoginState> {
  LoginCubit() : super(LoginInitial());
  static LoginCubit get(context) => BlocProvider.of(context);

  Void? userLogin({
    required String email,
    required String password,
  }) {
    emit(LoginLoading());
    DioHelper.pstData(
      url: '/Users/login',
      data: {
        'email': email,
        'password': password,
      },
    ).then((value) {
      print(value.data);
      emit(LoginSuccess());
    }).catchError((error) {
      print(error.toString());
      print("oussama");
      emit(LoginError(error.toString()));
    });
    return null;
  }
}
