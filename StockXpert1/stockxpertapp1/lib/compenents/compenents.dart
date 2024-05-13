// ignore_for_file: non_constant_identifier_names, constant_identifier_names

import 'package:flutter/material.dart';
import 'package:stockxpertapp1/models/demandeModel.dart';
import 'package:stockxpertapp1/screens/detatils.dart';

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
      width: 300,
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
              Row(children: [
                Text(
                  'N Commande :',
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: FontWeight.bold),
                ),
                Text(
                  '${article.numDemande}',
                  style: TextStyle(fontSize: 15, color: Color(0xff4772E2)),
                ),
              ]),
              const SizedBox(
                height: 3,
              ),
              Row(children: [
                Text(
                  'Date :',
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: FontWeight.bold),
                ),
                Text(
                  '${article.dateDemande.substring(0, 10)}',
                  style: TextStyle(fontSize: 15, color: Color(0xff4772E2)),
                ),
              ]),
              const SizedBox(
                height: 10,
              ),
              Container(
                height: 28,
                width: _getWidthForEtat(article.etat),
                decoration: BoxDecoration(
                  color: _getColorForEtat(article.etat),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Center(
                  child: Text(
                    '${article.etat}',
                    style: TextStyle(color: Colors.white, fontSize: 18),
                  ),
                ),
              )
            ]),
            SizedBox(
              width: _getWidthForEtatbox(article.etat),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: GestureDetector(
                onTap: () {
                  // Navigate to detailsScreen when CircleAvatar is tapped
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => detailsScreen(
                        numDemande: article.numDemande,
                        dateDemande: article.dateDemande.substring(0, 10),
                      ),
                    ),
                  );
                },
                child: CircleAvatar(
                  child: Icon(
                    Icons.arrow_forward_ios_outlined,
                    color: Colors.white,
                  ),
                  backgroundColor: Color(0xff4B4B4B),
                ),
              ),
            ),
          ],
        ),
      ),
    ));

Color _getColorForEtat(String etat) {
  switch (etat) {
    case 'demandee':
      return Color(0xffFFE500); // Yellow
    case 'prete':
      return Color(0xff49BF20); // Green
    case 'visee par resp':
    case 'visee par dg':
      return Color(0xffFF6B18); // Orange
    case 'servie':
      return Color(0xff477CE2); // Blue
    default:
      return Colors.grey; // Default color
  }
}

double _getWidthForEtat(String etat) {
  if (etat == 'visee par resp' || etat == 'visee par dg') {
    return 150.0;
  } else {
    return 115.0;
  }
}

double _getWidthForEtatbox(String etat) {
  if (etat == 'visee par resp' || etat == 'visee par dg') {
    return 55.0;
  } else {
    return 90.0;
  }
}
