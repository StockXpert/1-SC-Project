import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:stockxpertapp1/Cubit/cubitCommande/states.dart';
import 'package:stockxpertapp1/models/CommandeModel.dart';
import 'package:stockxpertapp1/network/DioHelper.dart';

class demandeCubit extends Cubit<demandeState> {
  demandeCubit() : super(demandeInitial());

  static demandeCubit get(context) => BlocProvider.of(context);
  CommandeModel? demandemodel;

  void getDemande() {
    emit(demandeLoadingState());

    DioHelper.getData(
      url: '/Sorties/showAllDemandes',
    ).then((value) {
      emit(demandeSuccessState());

      demandemodel = CommandeModel.fromJson(value.data);
      print(demandemodel!.etat);
    }).catchError((error) {
      print(error.toString());
      emit(demandeErrorState(error));
    });
  }
}
