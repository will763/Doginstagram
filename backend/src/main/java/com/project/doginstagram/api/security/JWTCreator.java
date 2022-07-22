package com.project.doginstagram.api.security;

import io.jsonwebtoken.*;
public class JWTCreator {
    public static final String HEADER_AUTHORIZATION = "Authorization";
    private static final String PREFIX = "Bearer";
    private final static String KEY = "94bb016c-43a2-41cb-8daa-cf3241ad62b7";

    public static String Generate(JWTObject jwtObject){

                String token = Jwts.builder().setSubject(jwtObject.getSubject()).setIssuedAt(jwtObject.getIssuedAt())
                        .setAudience(jwtObject.getClaim()) .signWith(SignatureAlgorithm.HS512, KEY)
                        .compact();

        return PREFIX + " " + token;
    }

    public static JWTObject Reverse(String token)
            throws ExpiredJwtException, UnsupportedJwtException, MalformedJwtException, SignatureException {

        JWTObject object = new JWTObject();
        token = token.replace(PREFIX, "");
        Claims claims = Jwts.parser().setSigningKey(KEY).parseClaimsJws(token).getBody();
        object.setSubject(claims.getSubject());
        object.setClaim(claims.getAudience());
        object.setIssuedAt(claims.getIssuedAt());
        return object;

    }
}
