import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stockxpertapp1/Cubit/CubitDemande/states.dart';
import 'package:stockxpertapp1/models/demandeModel.dart';

import 'package:stockxpertapp1/network/DioHelper.dart';

class demandeCubit extends Cubit<demandeState> {
  demandeCubit() : super(demandeInitial());

  static demandeCubit get(context) => BlocProvider.of(context);
  CommandeModel? demandemodel;
  ReponseModel? responsemodel;

  void getDemande() {
    emit(demandeLoadingState());

    DioHelper.getData(
            url: '/Sorties/showAllDemandes',
            token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJlc3BEaXJjdEBlc2ktc2JhLmR6Iiwicm9sZSI6IlJlc3BvbnNhYmxlIGRpcmVjdGUiLCJpYXQiOjE3MTU1NzM1NjksImV4cCI6MTcxNTY1OTk2OX0.gsd1bkK7JyMHYy16c-ehBBakn8N_-0PxuHVTpfboUwQ')
        .then((value) {
      emit(demandeSuccessState());

      demandemodel = CommandeModel.fromJson(value.data);

      print('oussama');

      print(demandemodel!.response[0].etat);
      print(demandemodel!.response[0].idDemandeur);
      print(demandemodel!.response[0].dateDemande);
      print(demandemodel!.response[0].numDemande);
    }).catchError((error) {
      print(error.toString());
      emit(demandeErrorState(error));
    });
  }
}
