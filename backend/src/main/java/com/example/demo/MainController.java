package com.example.demo;
//Class was developed by Vladislav Haponenko

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import model.Converter;
import model.ConverterRepository;
import model.User;
import model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.spec.SecretKeySpec;
import javax.validation.Valid;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;

@RestController

public class MainController {

    @Autowired
    private UserRepository userRepository;

   @Autowired
    private ConverterRepository converterRepository;


   static String SECRET_KEY="Gkm123FKezoNzl100";


    //
    //endpoint that responsible for deleting a translation
    //
    //as parameter we expect user's webtoken and converter's id
    //
    @RequestMapping(value = "/deleteTrans", method = RequestMethod.POST)
    public ResponseEntity<User> deleteTrans(@Valid @RequestBody TranslateRequest request) {
        User u=new User();
        //finding user
        try {
            u = userRepository.findByEmail(decodeJWT(request.getWebToken()).getIssuer());
        }catch(Exception e){
            return new ResponseEntity<User>(HttpStatus.ACCEPTED);
        }
        if(u!=null && u.getWebToken().equals(request.getWebToken())) {
            //if the user was found we delete a translation from history
            converterRepository.deleteById(request.getConverter().getId());
            User response=new User();
            response.setWebToken(u.getWebToken());
            return new ResponseEntity<User>(response, HttpStatus.OK);
        }else{
            return new ResponseEntity<User>(HttpStatus.ACCEPTED);
        }

    }

    //
    //endpoint that responsible for signing up
    //
    //as parameter we expect users email, password and name
    //
    @RequestMapping(value = "/sign-up", method = RequestMethod.POST)
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        //checking if the entered email is uniq
        if(userRepository.findByEmail(user.getEmail())!=null){
            return new ResponseEntity<User>(HttpStatus.ACCEPTED);
        }else{
            //if so, diving him tokens and saving them to the bd
            user.setRefreshToken(createJWT(user,999999999));
            user.setWebToken(createJWT(user,80000000));
            userRepository.save(user);
            User response=new User();
            response.setRefreshToken(user.getRefreshToken());
            response.setWebToken(user.getWebToken());
            return new ResponseEntity<User>(response,HttpStatus.OK);
        }

    }

    //
    //endpoint that adds a new user to a bd after registration
    //
    //as parameter we expect users email and password
    //
    @RequestMapping(value = "/sign-in", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<User> singUpUser(@Valid @RequestBody User user) {
        //checking if entered data is valid
        User u =userRepository.findByEmail(user.getEmail());

        if(u!=null && u.getPassword().equals(user.getPassword()) ){
            //if so refreshing tokens

            u.setRefreshToken(createJWT(u,999999999));
            u.setWebToken(createJWT(u,80000000));
            userRepository.save(u);

            //we want to give only insensitive information so we give
            //only name and tokens

            User response=new User();
            response.setRefreshToken(u.getRefreshToken());
            response.setWebToken(u.getWebToken());
            response.setName(u.getName());

            return new ResponseEntity<User>(response,HttpStatus.OK);

        }else{
            return new ResponseEntity<User>(HttpStatus.ACCEPTED);
        }

    }

    //
    //endpoint that shows history of translation of a user
    //
    //as parameter we expect only users webtoken
    //
    @RequestMapping(value = "/trans-history", method = RequestMethod.POST)
    public ResponseEntity<ArrayList<Converter>> getConverters(@Valid @RequestBody User user) {
            ArrayList<Converter> ar=new ArrayList<Converter>();
            //checking if a users webtoken is valid

            try {
                //if so taking all the converters which are assosiated with the user
                ar = converterRepository.findAllByEmail(decodeJWT(user.getWebToken()).getIssuer());
                //not giving sensative information
                ar.forEach((n)->n.setEmail(null));

            }catch(Exception e){
                return new ResponseEntity<ArrayList<Converter>>(HttpStatus.ACCEPTED);
            }

            return new ResponseEntity<ArrayList<Converter>>(ar, HttpStatus.OK);
    }

    //
    //endpoint that refreshes webtoken of a user
    //
    //as parameter we expect only users refresh and web tokens
    //
    @RequestMapping(value = "/refresh", method = RequestMethod.POST)
    public ResponseEntity<User> startRefresh(@Valid @RequestBody User user) {
        User u=new User();
        //finding user
        try {
            u = userRepository.findByEmail(decodeJWT(user.getRefreshToken()).getIssuer());
        }catch(Exception e){
            return new ResponseEntity<User>(HttpStatus.ACCEPTED);
        }
        if(u!=null && u.getWebToken().equals(user.getWebToken())) {

            //if the user is found refreshing webtoken
            u.setWebToken(createJWT(u,80000000));
            userRepository.save(u);

            User response=new User();
            response.setWebToken(u.getWebToken());

            return new ResponseEntity<User>(response, HttpStatus.OK);
        }else{
            return new ResponseEntity<User>(HttpStatus.ACCEPTED);
        }

    }

    //
    //endpoint which adds a translation into users history
    //
    //as parameter we expect webtoken of a user and converter object
    //
    @RequestMapping(value = "/translate", method = RequestMethod.POST)
    public ResponseEntity<Converter> createConverter(@Valid @RequestBody TranslateRequest request) {
        User u=new User();
        //finding a user
        try{
            u=userRepository.findByEmail(decodeJWT(request.getWebToken()).getIssuer());
        }catch(Exception e){
            return new ResponseEntity<Converter>(HttpStatus.ACCEPTED);
        }
        if(u!=null){
            //if the user is found adding the translation into bd
            Converter conv=request.getConverter();
            //we dont give bare email and use only webtokens
            //for passing emails to the server so we need
            //pull email from encoded webtoken
            conv.setEmail(decodeJWT(request.getWebToken()).getIssuer());
            converterRepository.save(conv);
            return new ResponseEntity<Converter>(request.getConverter(), HttpStatus.OK);
        }else{
           return new ResponseEntity<Converter>(HttpStatus.ACCEPTED);
        }
    }

    //
    //endpoints which are responsible for translating numbers
    //
    //as parameter we expect array of integers
    //
    @RequestMapping(value = "/from_arab", method = RequestMethod.POST)
    public ArrayList<String> createIntArray(@Valid @RequestBody  ArrayList<Integer> user) {
        ArrayList<String> ar=new ArrayList<String>();
        user.forEach((n)-> ar.add(Converter.ArabToRome(n)));
        return ar;
    }

    //
    //as parameter we expect array of Strings
    //
    @RequestMapping(value = "/from_rome", method = RequestMethod.POST)
    public ArrayList<Integer> createStringArray(@Valid @RequestBody  ArrayList<String> user) {
        ArrayList<Integer> ar=new ArrayList<Integer>();
        user.forEach((n)-> ar.add(Converter.RomeToArab(n)));
        return ar;
    }


    //methods which are responsible for coding and encoding users email
    public static String createJWT(User user, long ttlMillis) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //sgning our webtoken with our ApiKey secret
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //setting the webtoken Claims
        JwtBuilder builder = Jwts.builder().setId(user.getId())
                .setIssuedAt(now)
                .setSubject("FAR INC")
                .setIssuer(user.getEmail())
                .signWith(signatureAlgorithm, signingKey);

        //if it has been specified, let's add the expiration
        if (ttlMillis > 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        //Builds the webtoken and serializes it to a compact, URL-safe string
        return builder.compact();
    }

    public static Claims decodeJWT(String jwt) {
        //This line will throw an exception if it is not a signed webtoken (as expected)
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .parseClaimsJws(jwt).getBody();
        return claims;
    }
}