<?php
class Operations
{
    private $db_host = 'localhost'; 
    private $db_name = 'easy2drive'; 
    private $db_username = 'root';
    private $db_password = '';

    public function dbConnection()
    {
        try {
            $conn = new PDO("mysql:host={$this->db_host};dbname={$this->db_name}", $this->db_username, $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            exit;
        }
    }
}