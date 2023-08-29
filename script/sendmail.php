<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


$phone = $_POST['phone'];
$name = $_POST['name'];


$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';

$yourEmail = 'workingFridgeWeb@yandex.ru'; // ваш email на яндексе
$password = 'rsafidzewhtkphjv'; // ваш пароль к яндексу или пароль приложения

// настройки SMTP
$mail->Mailer = 'smtp';
$mail->Host = 'ssl://smtp.yandex.ru';
$mail->Port = 465;
$mail->SMTPAuth = true;
$mail->Username = $yourEmail; // ваш email - тот же что и в поле From:
$mail->Password = $password; // ваш пароль;


// формируем письмо

// от кого: это поле должно быть равно вашему email иначе будет ошибка
$mail->setFrom($yourEmail, 'Новая заявка');

// кому - получатель письма
$mail->addAddress('ilya.feigin@yandex.ru');  // кому

$mail->Subject = 'Новый заказ';  // тема письма

$mail->msgHTML("<html><body>
                    <h1>Новая заявка<br></h1>
                    <h4>Номер телефона: $phone</h4>
                    <h4>Имя клиента: $name</h4>
                    </html></body>");


if ($mail->send()) { // отправляем письмо
    echo 'Письмо отправлено!';
} else {
    echo 'Ошибка: ' . $mail->ErrorInfo;
}
?>


