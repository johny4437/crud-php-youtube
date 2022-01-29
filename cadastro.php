<?php

header('Access-Control-Allow-Origin: *');

require_once('config.php');
session_start();
$name=$_POST['name'];
$cpf=$_POST['cpf'];
$address=$_POST['address'];
$tel=$_POST['telephone'];
$email=$_POST['email'];

if(empty($name) || empty($cpf) || empty($address) || empty($tel) || empty($email)){
    echo json_encode(["message" => " Todos os campos precisam ser preenchidos!"]);
}else{
    $str = "SELECT * FROM clientes WHERE cpf='$cpf'";
    $response = $connection->query($str);

    if($response-> num_rows > 0){
        echo json_encode(["message"=>"CPF já  cadastrado"]);
    }else{

        
        $sql="INSERT INTO clientes(name, cpf, address, telephone, email) VALUES('".$name."', '".$cpf."',' ".$address."',' ".$tel."', '".$email."')";
        
        $result =  $connection->query($sql);
        
        if(!$result){
            http_response_code(500);
            echo json_encode(["message"=>"Error ao inserir no banco de Dados"]);
        }else{
            http_response_code(200);
            echo json_encode(["message" =>"Salvo com sucesso"]);
        }
    }
}


   




   


        
    



   

?>