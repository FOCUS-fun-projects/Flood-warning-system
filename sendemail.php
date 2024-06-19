<?php
    include_once('config.php');
        
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    $input = file_get_contents("php://input");
    
    $data = json_decode($input, true);
    
    if (isset($data['arr'], $data['sta'], $data['wtl'])) {
        $arr = $data['arr'];
        $station = $data['sta'];
        $wtlav = $data['wtl'];

        $select_query = mysqli_query($conn, "SELECT email, name FROM subscriber WHERE station='$station' AND village='$arr'");
        $res = mysqli_num_rows($select_query);

        if ($res > 0) {
            $data = mysqli_fetch_array($select_query);

            $email = $data['email'];
            $name = $data['name'];

            require 'phpmailer/src/Exception.php';
            require 'phpmailer/src/PHPMailer.php';
            require 'phpmailer/src/SMTP.php';

            $message = "<div>
                    <p><b>Dear ".$name.",</b></p>
                    <p>Hope you're well. Urgent heads-up! There's a potential flood risk in our area. It's crucial to take precautions for your safety and your loved ones.</p>

                    <h4>Key Info:</h4>
                    
                    <p><b>Location: </b>".$arr." 📍<br>
                    <b>Water Level: </b>".$wtlav." <br>
                    <b>Expected flood time frame:</b> in next 3 days ⏰.<br>
                    <b>Recommended Actions:</b></p>

                    <ol>
                    <li>Stay Informed: Keep an eye on local news channels, weather updates, and official announcements. 📺🌐</li>
                    <li>Evacuation Routes: Know designated routes and follow local authorities' instructions. 🚗🚶♂</li>
                    <li>Emergency Kit: Prepare essentials - water, non-perishable food, medications, and documents. 🎒🥤</li>
                    <li>Secure Valuables: If time allows, secure documents, valuables, and sentimental items. 🔒💼</li>
                    <li>Communication Plan: Establish a plan with family and friends. 📱👨👩👧👦</li>
                    </ol>

                    <p>Stay safe,<br>
                    Flood Warning and Monitoring System 🌟<br>
                    <b>Hot line : </b>0111123456 📧<p>
                                    
                    </div>";

        $email = $email;
        $mail = new PHPMailer(true);
        $mail->IsSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = "tls";
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->Username = "nilinduwara2001.08.02@gmail.com";
        $mail->Password = "scahtkcassfoadxh";
        $mail->FromName = "Flood Warning System";
        $mail->AddAddress($email);
        $mail->Subject = "Urgent: Flood Warning in $station";
        $mail->isHTML(true);
        $mail->Body = $message;
        $mail->send();

            } else {
                $msg = "Invalid Email";
            }
    }

    echo json_encode(['success' => 'Emails sent successfully']);

?>
