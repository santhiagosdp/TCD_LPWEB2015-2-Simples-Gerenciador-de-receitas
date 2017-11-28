<!-- 
Linguagem de programação WEB
Sistemas de Informação
CEULP ULBRA
Santhiago Dionizio Pinto
santhiagosdp@gmail.com
 -->


<?php
require_once 'vendor/autoload.php';

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Lpweb\AngularPostRequestServiceProvider;

date_default_timezone_set('America/Araguaina');
setlocale(LC_ALL, 'pt_BR.utf-8');


$app = new Silex\Application();
$app['debug'] = true;
$app->register(new AngularPostRequestServiceProvider());

function database()
{
    $config = new \Doctrine\DBAL\Configuration();
    $connectionParams = array(
        'dbname' => 'receitas',
        'user' => 'web',
        'password' => '1234',
        //'host' => 'localhost',
        'host' => 'SANTHIAGO\SQLEXPRESS',
        'driver' => 'pdo_sqlsrv',
        'charset' => 'utf-8'
    );
    return \Doctrine\DBAL\DriverManager::getConnection($connectionParams, $config);
}

$db = database();

//BUSCAR TODAS RECEITAS
$app->get('/receitas', function() use ($app, $db) {
    $sql = "Select Tipo.nome AS tipo, Receitas.nome, 
       chefe, tempo,
       preparo, Receitas.id       
       from       
        Receitas Inner Join Tipo on
        Receitas.tipo = Tipo.id";
    $query = $db->executeQuery($sql);
    $dados = $query->fetchAll();
    return $app->json($dados);
});

//BUSCAR TIPOS DE RECEITAS
$app->get('/tipos', function() use ($app, $db) {
    $sql = "SELECT * FROM Tipo";
    $query = $db->executeQuery($sql);
    $tipos = $query->fetchAll();
    return $app->json($tipos);
});

//BUSCAR RECEITA ESPECIFICA P APRESENTAR
$app->get('/receitas/{id}', function($id) use ($app, $db) {
    $sql = "Select Tipo.nome AS tipo, Receitas.nome, 
       chefe, tempo,
       preparo, Receitas.id       
       from       
        Receitas Inner Join Tipo on
        Receitas.tipo = Tipo.id WHERE Receitas.id = ?";
    
    $query = $db->executeQuery($sql, array($id));
    $receita = $query->fetch();
    return $app->json($receita);
});

//SALVAR E ATUALIZAR RECEITA 
$app->post('/receitas', function(Application $app, Request $request) use ($db) {
    $id = $request->request->get('id');
    $tipo = $request->request->get('tipo');
    $nome = $request->request->get('nome');
    $chefe = $request->request->get('chefe');
    $preparo = $request->request->get('preparo');
    $tempo = $request->request->get('tempo');
    
    $resp = 0;
    
    if ($id) {
        $sql = "UPDATE Receitas SET nome = ?, tipo = ?, 
                                    chefe = ?, preparo = ?,
                                    tempo = ?        
                                    WHERE id = ?";
        
        $resp = $db->executeUpdate($sql, array($nome, $tipo,
                                               $chefe, $preparo,
                                               $tempo, $id));    
            }
    
    else {
            $sql = "INSERT INTO Receitas(nome,chefe,tipo,tempo,preparo)
                    VALUES(?, ?, ?, ?, ?)";
        
            $db->executeUpdate($sql, array($nome, $chefe, $tipo, $tempo, $preparo));
            $resp = $db->lastInsertId();
         }
    return $resp;
});

// deletar receita
$app->delete('/receitas/{id}', function($id) use ($app, $db) {
    $sql = "DELETE FROM Receitas WHERE id = ?";
    $resp = $db->executeUpdate($sql, array($id));
    // buscando a lista de receitas novamente
    $sql = "SELECT * FROM Receitas";
    $query = $db->executeQuery($sql);
    $dados = $query->fetchAll();
    return $app->json($dados);
    
    //return $resp;
});

//SALVAR E ATUALIZAR TIPO
$app->post('/tipos', function(Application $app, Request $request) use ($db) {
    $id = $request->request->get('id');
    $nome = $request->request->get('nome');
    
    $resp = 0;
    
    if ($id) {
        $sql = "UPDATE Tipos SET nome = ? WHERE id = ?";
        
        $resp = $db->executeUpdate($sql, array($nome, $id));    
            }
    
    else {
            $sql = "INSERT INTO Tipo(nome)
                    VALUES(?)";
        
            $db->executeUpdate($sql, array($nome));
            $resp = $db->lastInsertId();
         }
    return $resp;
});

// deletar tipo
$app->delete('/tipo/{id}', function($id) use ($app, $db) {
    $sql = "DELETE FROM Tipo WHERE id = ?";
    $resp = $db->executeUpdate($sql, array($id));
    // buscando a lista de tipos novamente
    $sql = "SELECT * FROM Tipo";
    $query = $db->executeQuery($sql);
    $dados = $query->fetchAll();
    return $app->json($dados);
    
});



$app->run();










