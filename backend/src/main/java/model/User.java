package model;
//Class was developed by Vladislav Haponenko

import org.springframework.data.annotation.Id;

public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String password;

    private String webToken;
    private String refreshToken;


    public User(){}


    public String getId() {
        return id;
    }
    public String getRefreshToken() {
        return refreshToken;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public String getWebToken() {
        return webToken;
    }
    public String getName() {
        return name;
    }

    public void setName(String _n){
        this.name=_n;
    }
    public void setPassword(String _p){
        this.password=_p;
    }
    public void setEmail(String _e){
        this.email=_e;
    }
    public void setWebToken(String _w){
        this.webToken=_w;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    @Override
    public String toString() {
        return String.format(
                "Converter[id=%s, name='%s', email='%s', password='%s', webToken='%s']",
                id, name, email,password,webToken);
    }
}
