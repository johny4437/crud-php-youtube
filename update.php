<?php
header('Access-Control-Allow-Origin: *');
require_once('config.php');

$id = $_POST['id'];
$name=$_POST['name'];
$cpf=$_POST['cpf'];
$address=$_POST['address'];
$tel=$_POST['telephone'];
$email=$_POST['email'];


$sql="UPDATE clientes SET name='".$name."', cpf='".$cpf."', address='".$address."', telephone='".$tel."', email='".$email."' WHERE id='$id'";

$response = $connection->query($sql);

if($response===TRUE){
    echo json_encode(["message"=>"Usuário atualizado com sucesso"]);

}else{
   echo json_encode(["message"=>"Erro ao atualizar usuário"]);
}





?>