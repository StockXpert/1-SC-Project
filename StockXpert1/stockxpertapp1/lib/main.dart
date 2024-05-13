import 'package:flutter/material.dart';
import 'package:stockxpertapp1/network/DioHelper.dart';
import 'package:stockxpertapp1/screens/detatils.dart';
import 'package:stockxpertapp1/screens/directeurScreen.dart';

void main() {
  runApp(const MyApp());
  DioHelper.init();
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: DirecteurScreen(),
    );
  }
}
