-- -- senha TestBot270@
INSERT INTO usuario(id_usr, usr_login, email, nome, endereco, cidade, bairro, senha, ativo, is_admin) VALUES
(
    1,
    'José Carlos',
    'robo1@ifmobile.com',
    'bot testes',
    'Distrito dos Pescadores',
    256,
    'Castelo Branco',
    '$2b$11$eTcd0.cwrKk2rniwYWlgr.kYNiHMQAeIX2I4A6ZofUAGmmXalY4OG',
    true,
    false
),(
    2,
    'Lucas Silveira',
    'robo2@ifmobile.com',
    'bot testes',
    'Distrito dos Pescadores',
    512,
    'Castelo Branco',
    '$2b$11$eTcd0.cwrKk2rniwYWlgr.kYNiHMQAeIX2I4A6ZofUAGmmXalY4OG',
    true,
    false
),(
    3,
    'Antonio Nunes',
    'robo3@ifmobile.com',
    'bot testes',
    'Distrito dos Pescadores',
    1024,
    'Castelo Branco',
    '$2b$11$eTcd0.cwrKk2rniwYWlgr.kYNiHMQAeIX2I4A6ZofUAGmmXalY4OG',
    true,
    false
),(
    4,
    'Clovis Adamastor',
    'robo4@ifmobile.com',
    'bot testes',
    'Distrito dos Pescadores',
    2048,
    'Castelo Branco',
    '$2b$11$eTcd0.cwrKk2rniwYWlgr.kYNiHMQAeIX2I4A6ZofUAGmmXalY4OG',
    true,
    false
),(
    5,
    'Nomarrow Liz',
    'robo5@ifmobile.com',
    'bot testes',
    'Distrito dos Pescadores',
    100,
    'Castelo Branco',
    '$2b$11$eTcd0.cwrKk2rniwYWlgr.kYNiHMQAeIX2I4A6ZofUAGmmXalY4OG',
    true,
    false
),(
    6,
    'Juan Pedro',
    'robo6@ifmobile.com',
    'bot testes',
    'Distrito dos Pescadores',
    500,
    'Castelo Branco',
    '$2b$11$eTcd0.cwrKk2rniwYWlgr.kYNiHMQAeIX2I4A6ZofUAGmmXalY4OG',
    true,
    false
),(
    7,
    'Albert Küster',
    'robo7@ifmobile.com',
    'bot testes',
    'Distrito dos Pescadores',
    1000,
    'Castelo Branco',
    '$2b$11$eTcd0.cwrKk2rniwYWlgr.kYNiHMQAeIX2I4A6ZofUAGmmXalY4OG',
    true,
    false
),(
    8,
    'Albert Küster',
    'robo8@ifmobile.com',
    'bot testes',
    'Distrito dos Pescadores',
    2594,
    'Castelo Branco',
    '$2b$11$eTcd0.cwrKk2rniwYWlgr.kYNiHMQAeIX2I4A6ZofUAGmmXalY4OG',
    true,
    false
),(
    9,
    'Felix Ulrich',
    'robo9@ifmobile.com',
    'bot testes',
    'Distrito dos Pescadores',
    2594,
    'Castelo Branco',
    '$2b$11$eTcd0.cwrKk2rniwYWlgr.kYNiHMQAeIX2I4A6ZofUAGmmXalY4OG',
    true,
    false
),(
    10,
    'Robbert Castillo',
    'robo10@ifmobile.com',
    'bot testes',
    'Distrito dos Pescadores',
    2594,
    'Castelo Branco',
    '$2b$11$eTcd0.cwrKk2rniwYWlgr.kYNiHMQAeIX2I4A6ZofUAGmmXalY4OG',
    true,
    false
);

SELECT setval('usuario_id_usr_seq', (SELECT MAX(id_usr) FROM usuario));
