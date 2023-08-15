<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


class MailerController extends Controller
{

    // =============== [ Email ] ===================
    public function email()
    {
        return view("email");
    }


    public function composeEmail(Request $request)
    {
        require base_path("vendor/autoload.php");
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->Username   = 'sefactoryassignment@gmail.com';
            $mail->Password   = 'ijufctnhasvegpej';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port       = 465;
            $mail->setFrom('sefactoryassignment@gmail.com', 'Group Team');
            $mail->addAddress($request->received_email, 'user');
            $mail->isHTML(true);
            $mail->Subject = $request->received_subject;
            $mail->Body   =  $request->body;

            $mail->send();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}
