import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

class DioHelper {
  static Dio? dio;
  static init() {
    dio = Dio(BaseOptions(
      baseUrl: 'Http://192.168.88.248:3000',
      receiveDataWhenStatusError: true,
    ));
  }

  static Future<Response> pstData({
    @required String? url,
    @required Map<String, dynamic>? data,
    String? token,
  }) async {
    dio!.options.headers = {
      'Content-Type': 'application/json',
      'Authorization': token ?? '',
    };
    return dio!.post(
      url!,
      data: data!,
    );
  }

  static Future<Response> getData({
    required String? url,
    Map<String, dynamic>? query,
    String? token,
  }) async {
    dio!.options.headers = {
      'Authorization': token ?? '',
    };
    return dio!.get(
      url!,
      queryParameters: query,
    );
  }
}
