import 'package:flutter/material.dart';
import 'package:stockxpertapp1/network/DioHelper.dart';
import 'package:stockxpertapp1/screens/loginScreen.dart';

void main() {
  runApp(const MyApp());
  DioHelper.init();
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
