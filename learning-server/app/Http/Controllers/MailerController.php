<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


class MailerController extends Controller
{
    public function email()
    {
        return view("email");
    }


    public function composeEmail(Request $request)
    {
        require base_path("vendor/autoload.php");

        $course_id = $request->course_id;
        $course = Course::where('id', $course_id)->first();
        $enrollments = $course->enrollments->all();
        foreach($enrollments as $enrollment){
            $parent = $enrollment->student->childOf->parent;
            $email = $parent->email;
            $mail = new PHPMailer(true);

            try {
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->Username   = 'sefactoryassignment@gmail.com';
                $mail->Password   = 'ijufctnhasvegpej';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port       = 465;
                $mail->SMTPAuth = true;
                $mail->setFrom('sefactoryassignment@gmail.com', 'Group Team');
                $mail->addAddress($email, 'user');
                $mail->isHTML(true);
                $mail->Subject = 'A new material has been posted';
                $mail->Body   =  'Dear'. $parent->name .',

                                    I hope this message finds you well. I am writing to inform you that a new educational resource has been made available.
                
                                    Material : '. $request->description .'
                
                                    I kindly request your involvement in supporting your child\'s engagement with this material. Your active participation will greatly contribute to maximizing their learning experience.
                
                                    Should you have any inquiries or require further information, please do not hesitate to reach out.
                
                                    Warm Regards,
                                    "Teacher name"';

                $mail->send();
                echo 'Message has been sent';
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        }
    }
}
