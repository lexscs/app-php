<?php

//Variaveis
$url = "localhost";
$usuario = "root";
$senha = "root";
$base = "api";

//Conexao
$conexao = mysqli_connect($url, $usuario, $senha, $base);

//Arrumar caracteres especiais
mysqli_set_charset($conexao, "utf8");


?>
