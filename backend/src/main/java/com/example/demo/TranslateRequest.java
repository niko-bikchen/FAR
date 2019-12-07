package com.example.demo;
//Class was developed by Vladislav Haponenko

import model.Converter;
//
//The class is responsible for handling request which adds a translation to a users list
//
public class TranslateRequest {
    private String webToken;
    private Converter converter;

    public TranslateRequest(){}

    public void setConverter(Converter converter) {
        this.converter = converter;
    }

    public void setWebToken(String webToken) {
        this.webToken = webToken;
    }

    public String getWebToken() {
        return webToken;
    }

    public Converter getConverter() {
        return converter;
    }
}
