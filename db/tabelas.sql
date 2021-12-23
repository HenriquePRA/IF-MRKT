CREATE TABLE estado (
    uf VARCHAR(2) NOT NULL,
    nome_estado VARCHAR(40) NOT NULL,
    CONSTRAINT PK_uf PRIMARY KEY (uf)
);

CREATE TABLE cidade (
    id_cidade SERIAL NOT NULL,
    nome_cidade VARCHAR(40) NOT NULL,
    uf_cidade VARCHAR(2) NOT NULL,  
    CONSTRAINT PK_id_cidade PRIMARY KEY (id_cidade),
    CONSTRAINT FK_uf_cidade FOREIGN KEY (uf_cidade) REFERENCES estado(uf)
);

CREATE TABLE usuario (
    id_usr SERIAL NOT NULL,
    usr_login VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    endereco VARCHAR(60) NOT NULL,
    cidade SERIAL NOT NULL,
    bairro VARCHAR(30) NOT NULL,
    senha VARCHAR(128) NOT NULL,
    ativo BOOLEAN  NOT NULL DEFAULT TRUE,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT PK_id_usr PRIMARY KEY (id_usr),
    CONSTRAINT FK_cidade FOREIGN KEY (cidade) references cidade(id_cidade) 
);

CREATE TABLE usuario_contato (
    id_usr_c SERIAL NOT NULL, 
    id_usr SERIAL NOT NULL,
    id_contato SERIAL NOT NULL,
    CONSTRAINT FK_usr FOREIGN KEY (id_usr) REFERENCES usuario(id_usr),
    CONSTRAINT FK_contato FOREIGN KEY (id_contato) REFERENCES usuario(id_usr)
);

CREATE TABLE mensagem (
    id_mensagem SERIAL NOT NULL,
    id_remetente SERIAL NOT NULL,
    id_destinatario SERIAL NOT NULL,
    datahora TIMESTAMP NOT NULL,
    titulo VARCHAR(140) NOT NULL,
    mensagem TEXT NOT NULL,
    CONSTRAINT PK_id_msg PRIMARY KEY (id_mensagem),
    CONSTRAINT FK_remetente FOREIGN KEY (id_remetente) REFERENCES usuario(id_usr),
    CONSTRAINT FK_destinatario FOREIGN KEY (id_destinatario) REFERENCES usuario(id_usr)
);

CREATE TABLE produto (
    id_produto SERIAL NOT NULL,
    id_vendedor SERIAL NOT NULL,
    nome VARCHAR(120),
    descricao TEXT,
    usado BOOLEAN NOT NULL,
    valor_combinar BOOLEAN DEFAULT FALSE,
    valor_negociavel BOOLEAN DEFAULT TRUE,
    valor FLOAT DEFAULT 0,
    servico BOOLEAN DEFAULT FALSE,
    vendido BOOLEAN DEFAULT FALSE,
    CONSTRAINT PK_id_produto PRIMARY KEY (id_produto)
);
