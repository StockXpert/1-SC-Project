import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

class DioHelper {
  static Dio? dio;
  static init() {
    dio = Dio(BaseOptions(
        baseUrl: 'https://postman-rest-api-learner.glitch.me/',
        receiveDataWhenStatusError: true,
        headers: {
          'Content-Type': 'application/json',
        }));
  }

  static Future<Response> pstData({
    @required String? url,
    @required Map<String, dynamic>? data,
  }) async {
    return dio!.post(
      url!,
      data: data!,
    );
  }
}
