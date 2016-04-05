<?php

  require __DIR__ . '/assets/libraries/autoload.php';
  header('Content-Type: application/json');

  use \Mustache_Engine as Mustache,
      \PHPMailer;

  if($_POST['email'])
  {
    $mail = new PHPMailer;

    $mail->isSMTP();
    $mail->isHTML(true);

    $mail->Host       = 'smtpredemais1.com.br';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'smtp@redemais1.com.br';
    $mail->Password   = '1567ert';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom($_POST['email'], $_POST['name']);
    $mail->addAddress("desenvolvimento@dzoe.com.br", 'Rede Mais Um');
    $mail->addReplyTo($_POST['email'] , $_POST['name']);

    if (isset($_FILES['uploaded_file']) && $_FILES['uploaded_file']['error'] == UPLOAD_ERR_OK)
    {
      $mail->AddAttachment($_FILES['uploaded_file']['tmp_name'],$_FILES['uploaded_file']['name']);
    }

    $tpl = (new Mustache)->render(file_get_contents("./assets/template.tpl"), [
        'name'    => $_POST['name'],
        'subject' => $_POST['subject'],
        'message' => $_POST['message'],
        'email'   => $_POST['email']
    ]);

    $mail->Subject = $_POST['subject'];
    $mail->Body    = $tpl;

    if(!$mail->send()) {

      echo json_encode([
        "status"  => false ,
        "title"  => "Erro ao Enviar!" ,
        "text" => "Formulário Não Enviado Corretamente! Porfavor tente novamente."
      ]);

    } else {

      echo json_encode([
        "status"  => true ,
        "title"  => "Enviado com Sucesso" ,
        "text" => "Formulário Enviado Com Sucesso!"
      ]);

    }
  }
