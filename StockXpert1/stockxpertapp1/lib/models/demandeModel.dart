class CommandeModel {
  int? numDemande;
  String? dateDemande;
  String? etat;
  String? idDemandeur;

  CommandeModel.fromJson(Map<String, dynamic> json) {
    numDemande = json['num_demande'];
    etat = json['etat'];
    idDemandeur = json['id_demandeur'];
    dateDemande = json['date_demande'];
  }
}
