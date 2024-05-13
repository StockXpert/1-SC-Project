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
    padding: EdgeInsets.all(10.0),
    child: Container(
      height: 107,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.7), // Color of the shadow
            spreadRadius: 2, // Spread radius
            blurRadius: 7, // Blur radius
            offset: Offset(0, 3), // Offset in x and y axes from the container
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.only(left: 20, top: 10),
        child: Row(
          children: [
            Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Row(children: [
                Text(
                  'N Commande :',
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: FontWeight.bold),
                ),
                Text(
                  '23651',
                  style: TextStyle(fontSize: 15, color: Color(0xff4772E2)),
                ),
              ]),
              const SizedBox(
                height: 3,
              ),
              const Row(children: [
                Text(
                  'Date :',
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: FontWeight.bold),
                ),
                Text(
                  '26/03/2024',
                  style: TextStyle(fontSize: 15, color: Color(0xff4772E2)),
                ),
              ]),
              const SizedBox(
                height: 10,
              ),
              Container(
                height: 28,
                width: 115,
                decoration: BoxDecoration(
                  color: const Color(0xffFFE500),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Center(
                    child: Text(
                  'En attente',
                  style: TextStyle(color: Colors.white, fontSize: 18),
                )),
              ),
            ]),
            SizedBox(
              width: 70,
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: CircleAvatar(
                child: Icon(
                  Icons.arrow_forward_ios_outlined,
                  color: Colors.white,
                ),
                backgroundColor: Color(0xff4B4B4B),
              ),
            ),
          ],
        ),
      ),
    ));
