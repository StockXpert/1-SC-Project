class CommandeModel {
  List<ReponseModel> response = [];

  CommandeModel.fromJson(Map<String, dynamic> json) {
    json['response'].forEach((element) {
      response.add(ReponseModel.fromJson(element));
    });
  }
}

class ReponseModel {
  late int numDemande;
  late String etat;
  late String idDemandeur;
  late String dateDemande;

  ReponseModel.fromJson(Map<String, dynamic> json) {
    numDemande = json['num_demande'];
    etat = json['etat'];
    idDemandeur = json['id_demandeur'];
    dateDemande = json['date_demande'];
  }
}
