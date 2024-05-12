import 'package:flutter/material.dart';
import 'package:stockxpertapp1/compenents/compenents.dart';

class DirecteurScreen extends StatelessWidget {
  const DirecteurScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          decoration: const BoxDecoration(
              image: DecorationImage(
                  image: AssetImage("images/backgroundG.png"),
                  fit: BoxFit.cover)),
          child: Center(
              child: Padding(
            padding: const EdgeInsetsDirectional.symmetric(horizontal: 20),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  SizedBox(
                    height: 10,
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 280),
                    child: IconButton(
                      onPressed: () {},
                      icon: Icon(
                        Icons.notifications_rounded,
                        color: Colors.black,
                        size: 35,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Container(
                    height: 46,
                    child: TextFormField(
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'search must not be empty';
                        }
                        return null;
                      },
                      keyboardType: TextInputType.text,
                      controller: TextEditingController(),
                      decoration: InputDecoration(
                        prefixIcon: Icon(Icons.search),
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderSide: const BorderSide(
                            color: Colors.black, // Change border color here
                          ),
                          borderRadius: BorderRadius.circular(
                              70), // Match container border radius here
                        ),
                        labelText: '    Entrez le num de commande ',
                        hintStyle: const TextStyle(
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ),

                  Container(
                    height: 550,
                    width: 350,
                    child: ListView.separated(
                        physics: BouncingScrollPhysics(),
                        itemBuilder: (context, index) =>
                            buildBonComand(1, context),
                        separatorBuilder: (context, index) => SizedBox(
                              height: 25,
                            ),
                        itemCount: 10),
                  ),
                  // Container(
                  //     decoration: BoxDecoration(
                  //       boxShadow: [
                  //         BoxShadow(
                  //           color:
                  //               Colors.black.withOpacity(0.2), // Shadow color
                  //           spreadRadius:
                  //               3, // How spread out the shadow should be
                  //           blurRadius: 7, // How blurry the shadow should be
                  //           offset: Offset(0, 3), // Offset of the shadow
                  //         ),
                  //       ],
                  //       borderRadius: BorderRadiusDirectional.circular(15),
                  //       color: Colors.white,
                  //     ),
                  //     height: 500,
                  //     width: double.infinity,
                  //     child: Column(children: [
                  //       Container(
                  //         decoration: BoxDecoration(
                  //           borderRadius: BorderRadius.only(
                  //             topLeft: Radius.circular(15),
                  //             topRight: Radius.circular(15),
                  //           ),
                  //           color: Color(0xFFD8D8D8),
                  //         ),
                  //         height: 50,
                  //       ),
                  //     ]))
                ],
              ),
            ),
          ))),
    );
  }
}
