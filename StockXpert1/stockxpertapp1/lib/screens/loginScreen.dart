import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:stockxpertapp1/Cubit/Cubit.dart';
import 'package:stockxpertapp1/Cubit/states.dart';
import 'package:stockxpertapp1/compenents/compenents.dart';
import 'package:stockxpertapp1/screens/directeurScreen.dart';

// ignore: camel_case_types
class loginScreen extends StatelessWidget {
  var emailcontroller = TextEditingController();
  var paswordcontroller = TextEditingController();
  var formkey = GlobalKey<FormState>();

  loginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
        create: (BuildContext context) => LoginCubit(),
        child: BlocConsumer<LoginCubit, LoginState>(
            listener: (BuildContext context, state) {
          if (state is LoginSuccess) {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => DirecteurScreen()));
          } else if (state is LoginError) {
            Fluttertoast.showToast(
                msg: "login failed!!",
                toastLength: Toast.LENGTH_LONG,
                gravity: ToastGravity.BOTTOM,
                timeInSecForIosWeb: 5,
                backgroundColor: Colors.red,
                textColor: Colors.white,
                fontSize: 16.0);
          }
        }, builder: (context, state) {
          return Scaffold(
            body: Container(
              decoration: const BoxDecoration(
                  image: DecorationImage(
                      image: AssetImage("images/background.jpg"),
                      fit: BoxFit.cover)),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Center(
                  child: SingleChildScrollView(
                    child: Form(
                      key: formkey,
                      child: Column(
                        children: [
                          const Image(
                              image: AssetImage("images/logo.png"),
                              fit: BoxFit.cover),
                          const SizedBox(
                            height: 10,
                          ),
                          const Text(
                            "Beinvenue !",
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 20,
                                fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(
                            height: 50,
                          ),
                          Container(
                            decoration: BoxDecoration(
                              borderRadius:
                                  BorderRadiusDirectional.circular(15),
                              color: Colors.white,
                            ),
                            height: 400,
                            width: 300,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const SizedBox(
                                  height: 30.0,
                                ),
                                const Center(
                                  child: Text(
                                    'Login',
                                    style: TextStyle(
                                        fontSize: 32.0,
                                        fontWeight: FontWeight.bold,
                                        color: Color(0xFF477CE2)),
                                  ),
                                ),
                                const SizedBox(
                                  height: 40.0,
                                ),
                                Padding(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 15),
                                  child: SizedBox(
                                    height: 49,
                                    child: TextFormField(
                                      validator: ((value) {
                                        if (value?.isEmpty == true) {
                                          return 'Email address must not be empty';
                                        }
                                        return null;
                                      }),
                                      controller: emailcontroller,
                                      onFieldSubmitted: (value) {
                                        print('value');
                                      },
                                      onChanged: (value) {
                                        print('value');
                                      },
                                      keyboardType: TextInputType.emailAddress,
                                      decoration: const InputDecoration(
                                          labelText: 'Votre email ',
                                          labelStyle:
                                              TextStyle(color: Colors.grey),
                                          border: OutlineInputBorder(
                                            borderRadius: BorderRadius.all(
                                                Radius.circular(10)),
                                          ),
                                          prefixIcon: Icon(
                                            Icons.email,
                                          )),
                                    ),
                                  ),
                                ),
                                const SizedBox(
                                  height: 35.0,
                                ),
                                Padding(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 15),
                                  child: SizedBox(
                                    height: 49,
                                    child: TextFormField(
                                      validator: ((value) {
                                        if (value?.isEmpty == true) {
                                          return ' password must not be emppty';
                                        }
                                        return null;
                                      }),
                                      controller: paswordcontroller,
                                      obscureText: true,
                                      keyboardType:
                                          TextInputType.visiblePassword,
                                      decoration: const InputDecoration(
                                          labelText: 'Votre mot de passe',
                                          labelStyle:
                                              TextStyle(color: Colors.grey),
                                          border: OutlineInputBorder(
                                            borderRadius: BorderRadius.all(
                                                Radius.circular(10)),
                                          ),
                                          prefixIcon: Icon(
                                            Icons.lock,
                                          ),
                                          suffixIcon:
                                              Icon(Icons.remove_red_eye)),
                                    ),
                                  ),
                                ),
                                const SizedBox(
                                  height: 50.0,
                                ),
                                Center(
                                  child: ConditionalBuilder(
                                    condition: State is! LoginLoading,
                                    builder: (context) => defaultButton(
                                        size: 18,
                                        right: () {
                                          if (formkey.currentState
                                                  ?.validate() ==
                                              true) {
                                            LoginCubit.get(context).userLogin(
                                                email: emailcontroller.text,
                                                password:
                                                    paswordcontroller.text);

                                            print(emailcontroller.text);
                                            print(paswordcontroller.text);
                                          }
                                        },
                                        text: 'Login',
                                        width: 260,
                                        hight: 40,
                                        rad: 21,
                                        isapper: false),
                                    fallback: (context) => const Center(
                                        child: CircularProgressIndicator()),
                                  ),
                                ),
                                const SizedBox(
                                  height: 20.0,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          );
        }));
  }
}
