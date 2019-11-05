<?php
    include dirname(dirname(dirname(__FILE__))).'/qrcode/qrlib.php';
    //set it to writable location, a place for temp generated PNG files
    $QR_IMG_FOLDER = 'temp';
    $PNG_TEMP_DIR = dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR.$QR_IMG_FOLDER.DIRECTORY_SEPARATOR;
    
    //html PNG location prefix
    $PNG_WEB_DIR = $QR_IMG_FOLDER.DIRECTORY_SEPARATOR;

    //ofcourse we need rights to create temp dir
    if (!file_exists($PNG_TEMP_DIR)){
        mkdir($PNG_TEMP_DIR);
    }

    $filename = $PNG_TEMP_DIR.'test.png';
    
    //processing form input
    //remember to sanitize user input in real-life solution !!!
    $errorCorrectionLevel = 'L';
    $matrixPointSize = 10;
    if (isset($_POST['qr_str'])) { 
        //it's very important!
        if (trim($_POST['qr_str']) == '')
            die('{"error": "QR cannot be empty"}');    
        // user data
        $filename = $PNG_TEMP_DIR.md5($_POST['qr_str'].'_'.$errorCorrectionLevel.'_'.$matrixPointSize).'.png';
        QRcode::png($_POST['qr_str'], $filename, $errorCorrectionLevel, $matrixPointSize, 2);
    } else {    
        //default data
        QRcode::png('QR Code Generator', $filename, $errorCorrectionLevel, $matrixPointSize, 2);        
    }
    echo '{"file_name": "'.$PNG_WEB_DIR.basename($filename).'"}';
?>