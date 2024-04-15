PGDMP  ,                    |            xerathDatabase    16.2    16.2 .    7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            :           1262    16399    xerathDatabase    DATABASE     �   CREATE DATABASE "xerathDatabase" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
     DROP DATABASE "xerathDatabase";
                xerathDbAdmin    false            �            1259    16530 	   analitica    TABLE     5  CREATE TABLE public.analitica (
    "idAnalitica" integer NOT NULL,
    "idStream" integer NOT NULL,
    "promedioVisualizaciones" double precision DEFAULT 0 NOT NULL,
    "audienciaMaxima" integer DEFAULT 0 NOT NULL,
    inicio timestamp with time zone NOT NULL,
    fin timestamp with time zone NOT NULL
);
    DROP TABLE public.analitica;
       public         heap    xerathDbAdmin    false            �            1259    16417    canal    TABLE     3  CREATE TABLE public.canal (
    "idCanal" integer NOT NULL,
    "nombreCanal" character varying(15) DEFAULT 'undefined'::character varying NOT NULL,
    "descripcionCanal" text DEFAULT 'undefined'::text NOT NULL,
    "billeteraCanal" character varying(50) DEFAULT 'undefined'::character varying NOT NULL
);
    DROP TABLE public.canal;
       public         heap    xerathDbAdmin    false            �            1259    16512    chat    TABLE     �   CREATE TABLE public.chat (
    "idChat" integer NOT NULL,
    "idUsuario" integer NOT NULL,
    "idStream" integer NOT NULL,
    comentario text DEFAULT 'undefined'::text NOT NULL,
    "marcaDeTiempo" timestamp with time zone
);
    DROP TABLE public.chat;
       public         heap    xerathDbAdmin    false            �            1259    16488    notificacion    TABLE     �   CREATE TABLE public.notificacion (
    "idNotificacion" integer NOT NULL,
    "idStream" integer NOT NULL,
    "idUsuario" integer NOT NULL,
    abierta boolean DEFAULT false NOT NULL,
    "horaAbierta" timestamp with time zone NOT NULL
);
     DROP TABLE public.notificacion;
       public         heap    xerathDbAdmin    false            �            1259    16458    pago    TABLE     R  CREATE TABLE public.pago (
    "idPago" integer NOT NULL,
    "billeteraAcreedora" character varying(50) DEFAULT 'undefined'::character varying NOT NULL,
    "smartContractID" character varying(50) DEFAULT 'undefined'::character varying NOT NULL,
    "fechaPago" timestamp with time zone NOT NULL,
    "cantidadMeses" integer NOT NULL
);
    DROP TABLE public.pago;
       public         heap    xerathDbAdmin    false            �            1259    16427    seguidor    TABLE     �   CREATE TABLE public.seguidor (
    "idSeguidor" integer NOT NULL,
    "idUsuario" integer NOT NULL,
    "idCanal" integer NOT NULL,
    activo boolean DEFAULT true NOT NULL
);
    DROP TABLE public.seguidor;
       public         heap    xerathDbAdmin    false            �            1259    16471    stream    TABLE     �  CREATE TABLE public.stream (
    "idStream" integer NOT NULL,
    "smartContractID" character varying(50) DEFAULT 'undefined'::character varying NOT NULL,
    "idCanal" integer NOT NULL,
    titulo character varying(15) DEFAULT 'undefined'::character varying NOT NULL,
    descripcion text DEFAULT 'undefined'::text NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    visualizaciones integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.stream;
       public         heap    xerathDbAdmin    false            �            1259    16437 
   suscriptor    TABLE     �   CREATE TABLE public.suscriptor (
    "idSuscriptor" integer NOT NULL,
    "idUsuario" integer NOT NULL,
    "idCanal" integer NOT NULL,
    "idPago" integer NOT NULL,
    activo boolean DEFAULT true NOT NULL
);
    DROP TABLE public.suscriptor;
       public         heap    xerathDbAdmin    false            �            1259    16409    usuario    TABLE     D  CREATE TABLE public.usuario (
    "idUsuario" integer NOT NULL,
    "nombreUsuario" character varying(15) DEFAULT 'undefined'::character varying NOT NULL,
    email character varying(30) DEFAULT 'undefined'::character varying NOT NULL,
    contrasena character varying(25) DEFAULT 'undefined'::character varying NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    xerathDbAdmin    false            �            1259    16542    video    TABLE     �   CREATE TABLE public.video (
    "idVideo" integer NOT NULL,
    "idStream" integer NOT NULL,
    miniatura bytea NOT NULL,
    "streamDecodificado" bytea NOT NULL
);
    DROP TABLE public.video;
       public         heap    xerathDbAdmin    false            3          0    16530 	   analitica 
   TABLE DATA                 public          xerathDbAdmin    false    223   "9       ,          0    16417    canal 
   TABLE DATA                 public          xerathDbAdmin    false    216   <9       2          0    16512    chat 
   TABLE DATA                 public          xerathDbAdmin    false    222   V9       1          0    16488    notificacion 
   TABLE DATA                 public          xerathDbAdmin    false    221   p9       /          0    16458    pago 
   TABLE DATA                 public          xerathDbAdmin    false    219   �9       -          0    16427    seguidor 
   TABLE DATA                 public          xerathDbAdmin    false    217   �9       0          0    16471    stream 
   TABLE DATA                 public          xerathDbAdmin    false    220   �9       .          0    16437 
   suscriptor 
   TABLE DATA                 public          xerathDbAdmin    false    218   �9       +          0    16409    usuario 
   TABLE DATA                 public          xerathDbAdmin    false    215   �9       4          0    16542    video 
   TABLE DATA                 public          xerathDbAdmin    false    224   :       �           2606    16536    analitica analitica_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.analitica
    ADD CONSTRAINT analitica_pkey PRIMARY KEY ("idAnalitica");
 B   ALTER TABLE ONLY public.analitica DROP CONSTRAINT analitica_pkey;
       public            xerathDbAdmin    false    223                       2606    16426    canal canal_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.canal
    ADD CONSTRAINT canal_pkey PRIMARY KEY ("idCanal");
 :   ALTER TABLE ONLY public.canal DROP CONSTRAINT canal_pkey;
       public            xerathDbAdmin    false    216            �           2606    16519    chat chat_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_pkey PRIMARY KEY ("idChat");
 8   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_pkey;
       public            xerathDbAdmin    false    222            �           2606    16493    notificacion notificacion_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.notificacion
    ADD CONSTRAINT notificacion_pkey PRIMARY KEY ("idNotificacion");
 H   ALTER TABLE ONLY public.notificacion DROP CONSTRAINT notificacion_pkey;
       public            xerathDbAdmin    false    221            �           2606    16464    pago pago_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_pkey PRIMARY KEY ("idPago");
 8   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_pkey;
       public            xerathDbAdmin    false    219            �           2606    16431    seguidor seguidor_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.seguidor
    ADD CONSTRAINT seguidor_pkey PRIMARY KEY ("idSeguidor");
 @   ALTER TABLE ONLY public.seguidor DROP CONSTRAINT seguidor_pkey;
       public            xerathDbAdmin    false    217            �           2606    16482    stream stream_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.stream
    ADD CONSTRAINT stream_pkey PRIMARY KEY ("idStream");
 <   ALTER TABLE ONLY public.stream DROP CONSTRAINT stream_pkey;
       public            xerathDbAdmin    false    220            �           2606    16457    suscriptor suscriptor_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.suscriptor
    ADD CONSTRAINT suscriptor_pkey PRIMARY KEY ("idSuscriptor");
 D   ALTER TABLE ONLY public.suscriptor DROP CONSTRAINT suscriptor_pkey;
       public            xerathDbAdmin    false    218            }           2606    16416    usuario usuario_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY ("idUsuario");
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            xerathDbAdmin    false    215            �           2606    16548    video video_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.video
    ADD CONSTRAINT video_pkey PRIMARY KEY ("idVideo");
 :   ALTER TABLE ONLY public.video DROP CONSTRAINT video_pkey;
       public            xerathDbAdmin    false    224            �           2606    16451    seguidor canal-seguidor    FK CONSTRAINT     �   ALTER TABLE ONLY public.seguidor
    ADD CONSTRAINT "canal-seguidor" FOREIGN KEY ("idCanal") REFERENCES public.canal("idCanal") NOT VALID;
 C   ALTER TABLE ONLY public.seguidor DROP CONSTRAINT "canal-seguidor";
       public          xerathDbAdmin    false    216    217    4735            �           2606    16483    stream canal-stream    FK CONSTRAINT     �   ALTER TABLE ONLY public.stream
    ADD CONSTRAINT "canal-stream" FOREIGN KEY ("idCanal") REFERENCES public.canal("idCanal") ON UPDATE RESTRICT ON DELETE RESTRICT;
 ?   ALTER TABLE ONLY public.stream DROP CONSTRAINT "canal-stream";
       public          xerathDbAdmin    false    220    4735    216            �           2606    16445    suscriptor canal-suscriptor    FK CONSTRAINT     �   ALTER TABLE ONLY public.suscriptor
    ADD CONSTRAINT "canal-suscriptor" FOREIGN KEY ("idCanal") REFERENCES public.canal("idCanal");
 G   ALTER TABLE ONLY public.suscriptor DROP CONSTRAINT "canal-suscriptor";
       public          xerathDbAdmin    false    216    4735    218            �           2606    16466    suscriptor pago-suscriptor    FK CONSTRAINT     �   ALTER TABLE ONLY public.suscriptor
    ADD CONSTRAINT "pago-suscriptor" FOREIGN KEY ("idPago") REFERENCES public.pago("idPago") ON UPDATE RESTRICT ON DELETE RESTRICT NOT VALID;
 F   ALTER TABLE ONLY public.suscriptor DROP CONSTRAINT "pago-suscriptor";
       public          xerathDbAdmin    false    218    4741    219            �           2606    16537    analitica stream-analitica    FK CONSTRAINT     �   ALTER TABLE ONLY public.analitica
    ADD CONSTRAINT "stream-analitica" FOREIGN KEY ("idStream") REFERENCES public.stream("idStream");
 F   ALTER TABLE ONLY public.analitica DROP CONSTRAINT "stream-analitica";
       public          xerathDbAdmin    false    223    4743    220            �           2606    16525    chat stream-chat    FK CONSTRAINT     }   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT "stream-chat" FOREIGN KEY ("idStream") REFERENCES public.stream("idStream");
 <   ALTER TABLE ONLY public.chat DROP CONSTRAINT "stream-chat";
       public          xerathDbAdmin    false    4743    220    222            �           2606    16507     notificacion stream-notificacion    FK CONSTRAINT     �   ALTER TABLE ONLY public.notificacion
    ADD CONSTRAINT "stream-notificacion" FOREIGN KEY ("idStream") REFERENCES public.stream("idStream") NOT VALID;
 L   ALTER TABLE ONLY public.notificacion DROP CONSTRAINT "stream-notificacion";
       public          xerathDbAdmin    false    221    220    4743            �           2606    16520    chat usuario-chat    FK CONSTRAINT     �   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT "usuario-chat" FOREIGN KEY ("idUsuario") REFERENCES public.usuario("idUsuario");
 =   ALTER TABLE ONLY public.chat DROP CONSTRAINT "usuario-chat";
       public          xerathDbAdmin    false    222    215    4733            �           2606    16502 !   notificacion usuario-notificacion    FK CONSTRAINT     �   ALTER TABLE ONLY public.notificacion
    ADD CONSTRAINT "usuario-notificacion" FOREIGN KEY ("idUsuario") REFERENCES public.usuario("idUsuario") NOT VALID;
 M   ALTER TABLE ONLY public.notificacion DROP CONSTRAINT "usuario-notificacion";
       public          xerathDbAdmin    false    221    215    4733            �           2606    16432    seguidor usuario-seguidor    FK CONSTRAINT     �   ALTER TABLE ONLY public.seguidor
    ADD CONSTRAINT "usuario-seguidor" FOREIGN KEY ("idUsuario") REFERENCES public.usuario("idUsuario") ON UPDATE RESTRICT ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.seguidor DROP CONSTRAINT "usuario-seguidor";
       public          xerathDbAdmin    false    215    217    4733            �           2606    16440    suscriptor usuario-suscriptor    FK CONSTRAINT     �   ALTER TABLE ONLY public.suscriptor
    ADD CONSTRAINT "usuario-suscriptor" FOREIGN KEY ("idUsuario") REFERENCES public.usuario("idUsuario") ON UPDATE RESTRICT ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public.suscriptor DROP CONSTRAINT "usuario-suscriptor";
       public          xerathDbAdmin    false    215    218    4733            �           2606    16549    video video-stream    FK CONSTRAINT     �   ALTER TABLE ONLY public.video
    ADD CONSTRAINT "video-stream" FOREIGN KEY ("idStream") REFERENCES public.stream("idStream") NOT VALID;
 >   ALTER TABLE ONLY public.video DROP CONSTRAINT "video-stream";
       public          xerathDbAdmin    false    4743    224    220            3   
   x���          ,   
   x���          2   
   x���          1   
   x���          /   
   x���          -   
   x���          0   
   x���          .   
   x���          +   
   x���          4   
   x���         