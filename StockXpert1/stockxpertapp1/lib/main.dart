import 'package:flutter/material.dart';
import 'package:stockxpertapp1/const/const.dart';
import 'package:stockxpertapp1/network/DioHelper.dart';
import 'package:stockxpertapp1/network/chhelper.dart';
import 'package:stockxpertapp1/screens/detatils.dart';
import 'package:stockxpertapp1/screens/directeurScreen.dart';
import 'package:stockxpertapp1/screens/loginScreen.dart';

void main() {
  runApp(const MyApp());
  DioHelper.init();
  CacheHelper.init();
  Widget widget;
  token = CacheHelper.getData(key: 'token');
  print('token = $token');
  if (token != null) {
    widget = DirecteurScreen();
  } else {
    widget = loginScreen();
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: loginScreen(),
    );
  }
}
