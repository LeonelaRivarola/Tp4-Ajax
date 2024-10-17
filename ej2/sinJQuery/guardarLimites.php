<?php
if (isset($_POST['min']) && isset($_POST['max'])) {
    $min = $_POST['min'];
    $max = $_POST['max'];
    $data = $min . ',' . $max;
    file_put_contents('limites.txt', $data);
    echo 'Límites guardados con éxito';
} else {
    echo 'Error al guardar los límites';
}
?>
