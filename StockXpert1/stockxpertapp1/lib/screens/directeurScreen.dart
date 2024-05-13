import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stockxpertapp1/Cubit/CubitDemande/Cubit.dart';
import 'package:stockxpertapp1/Cubit/CubitDemande/states.dart';
import 'package:stockxpertapp1/compenents/compenents.dart';

class DirecteurScreen extends StatelessWidget {
  const DirecteurScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
        create: (BuildContext context) => demandeCubit()..getDemande(),
        child: BlocConsumer<demandeCubit, demandeState>(
            listener: (BuildContext context, state) {},
            builder: (context, state) {
              var demandemodel = demandeCubit.get(context).demandemodel;
              return Scaffold(
                body: Container(
                    decoration: const BoxDecoration(
                        image: DecorationImage(
                            image: AssetImage("images/backgroundG.png"),
                            fit: BoxFit.cover)),
                    child: Center(
                        child: Padding(
                      padding:
                          const EdgeInsetsDirectional.symmetric(horizontal: 20),
                      child: SingleChildScrollView(
                        child: Column(
                          children: [
                            const SizedBox(
                              height: 10,
                            ),
                            Padding(
                              padding: const EdgeInsets.only(left: 280),
                              child: IconButton(
                                onPressed: () {},
                                icon: const Icon(
                                  Icons.notifications_rounded,
                                  color: Colors.black,
                                  size: 35,
                                ),
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            SizedBox(
                              height: 46,
                              child: Container(
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(
                                      70), // Match container border radius here
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.grey, // Shadow color
                                      blurRadius: 5, // Spread radius
                                      offset: Offset(0,
                                          2), // Offset in x and y axes from the container
                                    ),
                                  ],
                                ),
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
                                    prefixIcon: const Icon(Icons.search),
                                    filled: true,
                                    fillColor: Colors.white,
                                    border: OutlineInputBorder(
                                      borderSide:
                                          BorderSide.none, // No border side
                                      borderRadius: BorderRadius.circular(70),
                                    ),
                                    labelText: '    Entrez le num de commande ',
                                    hintStyle: const TextStyle(
                                      color: Colors.black,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(
                              height: 550,
                              width: 350,
                              child: ListView.separated(
                                physics: const BouncingScrollPhysics(),
                                itemBuilder: (context, index) {
                                  // Assuming 'demandemodel' contains your CommandeModel object
                                  // Ensure demandemodel is not null and index is within bounds
                                  if (demandemodel != null &&
                                      index >= 0 &&
                                      index < demandemodel!.response.length) {
                                    // Pass each response item to buildBonComand
                                    return buildBonComand(
                                        demandemodel!.response[index], context);
                                  } else {
                                    // Return an empty container if demandemodel is null or index is out of bounds
                                    return Container();
                                  }
                                },
                                separatorBuilder: (context, index) =>
                                    const SizedBox(
                                  height: 2,
                                ),
                                itemCount: demandemodel?.response.length ??
                                    0, // Use safe navigation operator to avoid null errors
                              ),
                            ),
                          ],
                        ),
                      ),
                    ))),
              );
            }));
  }
}
