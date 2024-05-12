// ignore_for_file: non_constant_identifier_names, constant_identifier_names

import 'package:flutter/material.dart';

int _currentValue = 24;
Widget defaultButton(
        {String family = "WorkSans",
        double width = double.infinity,
        double hight = 32,
        Color background = const Color(0xffd0fd3e),
        Color textColor = Colors.black,
        required double size,
        VoidCallback? right,
        required String text,
        bool isapper = true,
        double rad = 0}) =>
    Container(
      decoration: BoxDecoration(
          boxShadow: const [
            BoxShadow(
                color: Color(0x40000000),
                offset: Offset(0, 4),
                blurRadius: 4,
                spreadRadius: 0)
          ],
          borderRadius: BorderRadiusDirectional.circular(rad),
          color: background),
      width: width,
      height: hight,
      child: MaterialButton(
          onPressed: right,
          child: // Login
              Text(text,
                  style: TextStyle(
                      color: textColor,
                      fontWeight: FontWeight.bold,
                      fontFamily: family,
                      fontStyle: FontStyle.normal,
                      fontSize: size),
                  textAlign: TextAlign.center)),
    );

Widget buildBonComand(article, context) => Padding(
    padding: const EdgeInsets.all(10.0),
    child: Column(children: [
      Row(children: [
        Text(
          'N Commande :',
          style: TextStyle(color: Colors.black, fontSize: 15),
        ),
        Text(
          '23651',
          style: TextStyle(fontSize: 15, color: Color(0xff4772E2)),
        ),
      ]),
      SizedBox(
        height: 10,
      ),
      Row(children: [
        Text(
          'Date :',
          style: TextStyle(color: Colors.black, fontSize: 15),
        ),
        Text(
          '26/03/2024',
          style: TextStyle(fontSize: 15, color: Color(0xff4772E2)),
        ),
      ]),
      SizedBox(
        height: 15,
      ),
      Container(
        height: 20,
        width: 107,
        decoration: BoxDecoration(
          color: Color(0xffFFE500),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Center(child: Text('En attente')),
      ),
    ]));
