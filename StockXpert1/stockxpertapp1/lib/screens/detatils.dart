import 'package:flutter/material.dart';
import 'package:stockxpertapp1/screens/detatils.dart';
import 'package:timeline_tile/timeline_tile.dart';

class detailsScreen extends StatefulWidget {
  final int numDemande;
  final String dateDemande;

  const detailsScreen({
    required this.numDemande,
    required this.dateDemande,
    Key? key,
  }) : super(key: key);

  @override
  State<detailsScreen> createState() => _detailsScreenState();
}

class _detailsScreenState extends State<detailsScreen> {
  @override
  bool step1Finished = true; // Example: Change it according to your logic
  bool step2Finished = true;
  bool step3Finished = false; // Example: Change it according to your logic

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
            image: DecorationImage(
                image: AssetImage("images/backgroundG.png"),
                fit: BoxFit.cover)),
        child: Padding(
          padding: const EdgeInsets.all(25.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                height: 20,
              ),
              GestureDetector(
                onTap: () {
                  // Navigate to detailsScreen when CircleAvatar is tapped
                  Navigator.pop(context);
                },
                child: CircleAvatar(
                  maxRadius: 23,
                  child: Icon(
                    size: 29,
                    Icons.arrow_back_ios_outlined,
                    color: Colors.white,
                  ),
                  backgroundColor: Color(0xff4B4B4B),
                ),
              ),
              SizedBox(
                height: 30,
              ),
              Container(
                height: 72,
                width: 312,
                decoration: BoxDecoration(
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(
                        color:
                            Colors.grey.withOpacity(0.7), // Color of the shadow
                        spreadRadius: 2, // Spread radius
                        blurRadius: 7, // Blur radius
                        offset: Offset(
                            0, 3), // Offset in x and y axes from the container
                      ),
                    ],
                    borderRadius: BorderRadius.circular(20)),
                child: Padding(
                  padding: const EdgeInsets.only(left: 20, top: 10),
                  child: Column(
                    children: [
                      Row(children: [
                        Text(
                          'N Commande :',
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 15,
                              fontWeight: FontWeight.bold),
                        ),
                        Text(
                          '${widget.numDemande}',
                          style:
                              TextStyle(fontSize: 15, color: Color(0xff4772E2)),
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
                          '${widget.dateDemande}',
                          style:
                              TextStyle(fontSize: 15, color: Color(0xff4772E2)),
                        ),
                      ]),
                      Row(),
                    ],
                  ),
                ),
              ),
              SizedBox(
                height: 40,
              ),
              Container(
                height: 480,
                width: 312,
                decoration: BoxDecoration(
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(
                        color:
                            Colors.grey.withOpacity(0.7), // Color of the shadow
                        spreadRadius: 2, // Spread radius
                        blurRadius: 7, // Blur radius
                        offset: Offset(
                            0, 3), // Offset in x and y axes from the container
                      ),
                    ],
                    borderRadius: BorderRadius.circular(20)),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      height: 7,
                    ),
                    Center(
                      child: Text(
                        'Progress',
                        style: TextStyle(
                            color: Colors.black,
                            fontSize: 25,
                            fontWeight: FontWeight.bold),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 30, top: 25),
                      child: TimelineTile(
                        alignment: TimelineAlign.start,
                        isFirst: true,
                        indicatorStyle: IndicatorStyle(
                          width: 40,
                          color: step1Finished
                              ? Color(0xff477CE2)
                              : Colors.grey, // Check if step is finished
                          padding: const EdgeInsets.all(8),
                          iconStyle: step1Finished
                              ? IconStyle(
                                  color: Colors.white,
                                  iconData: Icons
                                      .check, // Only show icon when step is finished
                                )
                              : null, // If step is not finished, omit the IconStyle
                        ),
                        afterLineStyle: LineStyle(
                          color: step1Finished
                              ? Color(0xff477CE2)
                              : Colors.grey, // Check if step is finished
                          thickness: 4,
                        ),
                        endChild: Container(
                          constraints: const BoxConstraints(
                            minHeight: 100,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.only(top: 20, left: 15),
                            child: Text(
                              'Demandee',
                              style: TextStyle(
                                  fontSize: 17, fontWeight: FontWeight.w500),
                            ),
                          ), // Replace with your content
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 30, top: 0),
                      child: TimelineTile(
                        alignment: TimelineAlign.start,
                        beforeLineStyle: LineStyle(
                          color: step1Finished
                              ? Color(0xff477CE2)
                              : Colors.grey, // Check if step1 is finished
                          thickness: 4,
                        ),
                        afterLineStyle: LineStyle(
                          color: step3Finished
                              ? Color(0xff477CE2)
                              : Colors.grey, // Check if step1 is finished
                          thickness: 4,
                        ),
                        indicatorStyle: IndicatorStyle(
                          width: 40,
                          color: step2Finished
                              ? Color(0xff477CE2)
                              : Colors.grey, // Check if step2 is finished
                          padding: const EdgeInsets.all(8),
                          iconStyle: IconStyle(
                              color: Colors.white, iconData: Icons.check),
                        ),
                        endChild: Container(
                          constraints: const BoxConstraints(
                            minHeight: 100,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.only(top: 20, left: 15),
                            child: Text(
                              'Demandee',
                              style: TextStyle(
                                  fontSize: 17, fontWeight: FontWeight.w500),
                            ),
                          ), // Replace with your content
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 30, top: 0),
                      child: TimelineTile(
                        alignment: TimelineAlign.start,
                        beforeLineStyle: LineStyle(
                          color: step3Finished
                              ? Color(0xff477CE2)
                              : Colors.grey, // Check if step1 is finished
                          thickness: 4,
                        ),
                        afterLineStyle: LineStyle(
                          color: step3Finished
                              ? Color(0xff477CE2)
                              : Colors.grey, // Check if step1 is finished
                          thickness: 4,
                        ),
                        indicatorStyle: IndicatorStyle(
                          width: 40,
                          color: step3Finished
                              ? Color(0xff477CE2)
                              : Colors.grey, // Check if step2 is finished
                          padding: const EdgeInsets.all(8),
                          iconStyle: step3Finished
                              ? IconStyle(
                                  color: Colors.white,
                                  iconData: Icons
                                      .check, // Only show icon when step is finished
                                )
                              : null, // If step is not finished, omit the IconStyle
                        ),
                        endChild: Container(
                          constraints: const BoxConstraints(
                            minHeight: 100,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.only(top: 20, left: 15),
                            child: Text(
                              'Demandee',
                              style: TextStyle(
                                  fontSize: 17, fontWeight: FontWeight.w500),
                            ),
                          ), // Replace with your content
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 30, top: 0),
                      child: TimelineTile(
                        alignment: TimelineAlign.start,
                        beforeLineStyle: LineStyle(
                          color: step3Finished
                              ? Color(0xff477CE2)
                              : Colors.grey, // Check if step1 is finished
                          thickness: 4,
                        ),
                        afterLineStyle: LineStyle(
                          color: step3Finished
                              ? Color(0xff477CE2)
                              : Colors.grey, // Check if step1 is finished
                          thickness: 4,
                        ),
                        isLast: true,
                        indicatorStyle: IndicatorStyle(
                          width: 40,
                          color: step3Finished
                              ? Color(0xff477CE2)
                              : Colors.grey, // Check if step2 is finished
                          padding: const EdgeInsets.all(8),
                          iconStyle: step3Finished
                              ? IconStyle(
                                  color: Colors.white,
                                  iconData: Icons
                                      .check, // Only show icon when step is finished
                                )
                              : null, // If step is not finished, omit the IconStyle
                        ),
                        endChild: Container(
                          constraints: const BoxConstraints(
                            minHeight: 100,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.only(top: 20, left: 15),
                            child: Text(
                              'Demandee',
                              style: TextStyle(
                                  fontSize: 17, fontWeight: FontWeight.w500),
                            ),
                          ), // Replace with your content
                        ),
                      ),
                    ),
                    // Similar logic for other steps
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
