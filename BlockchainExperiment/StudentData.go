package main

import (
    "crypto/sha256"
    "encoding/hex"
    "fmt"
    "time"
)

// Block represents a single block in the blockchain.
type Block struct {
    Index     int
    Timestamp int64
    Student   StudentData
    PrevHash  string
    Hash      string
    Nonce     int
}

// StudentData represents student information.
type StudentData struct {
    Name         string
    Semester     string
    Branch       string
    SPI          float64
    MobileNumber string
}

func (b *Block) calculateHash() {
    data := fmt.Sprintf("%d%d%v%v%v", b.Index, b.Timestamp, b.Student, b.PrevHash, b.Nonce)
    hash := sha256.Sum256([]byte(data))
    b.Hash = hex.EncodeToString(hash[:])
}

func createGenesisBlock() Block {
    return Block{
        Index:     0,
        Timestamp: time.Now().Unix(),
        Student: StudentData{
            Name:         "Genesis",
            Semester:     "N/A",
            Branch:       "N/A",
            SPI:          0.0,
            MobileNumber: "N/A",
        },
        PrevHash: "0",
        Hash:     "",
        Nonce:    0,
    }
}

func createNewBlock(prevBlock Block, studentData StudentData) Block {
    newBlock := Block{
        Index:     prevBlock.Index + 1,
        Timestamp: time.Now().Unix(),
        Student:   studentData,
        PrevHash:  prevBlock.Hash,
        Hash:      "",
        Nonce:     0,
    }
    newBlock.calculateHash()
    return newBlock
}

func proofOfWork(prevBlock Block, studentData StudentData, difficulty int) Block {
    newBlock := createNewBlock(prevBlock, studentData)
    prefix := ""
    for i := 0; i < difficulty; i++ {
        prefix += "0"
    }
    for {
        if newBlock.Hash[:difficulty] == prefix {
            return newBlock
        }
        newBlock.Nonce++
        newBlock.calculateHash()
    }
}

func main() {
    difficulty := 4 // Adjust the difficulty level as needed

    // Initialize the blockchain with the genesis block
    blockchain := []Block{createGenesisBlock()}

    var students []StudentData

    // Prompt the user for the total number of students
    var totalStudents int
    fmt.Print("Enter the total number of students: ")
    fmt.Scan(&totalStudents)

    // Prompt the user for student data
    for i := 0; i < totalStudents; i++ {
        var student StudentData
        fmt.Printf("Enter data for student %d:\n", i+1)
        fmt.Print("Name: ")
        fmt.Scan(&student.Name)
        fmt.Print("Semester: ")
        fmt.Scan(&student.Semester)
        fmt.Print("Branch: ")
        fmt.Scan(&student.Branch)
        fmt.Print("SPI: ")
        fmt.Scan(&student.SPI)
        fmt.Print("Mobile Number: ")
        fmt.Scan(&student.MobileNumber)
        students = append(students, student)
    }

    // Create new blocks for each student
    for _, student := range students {
        latestBlock := blockchain[len(blockchain)-1]
        newBlock := proofOfWork(latestBlock, student, difficulty)
        blockchain = append(blockchain, newBlock)
    }

    // Print the blockchain including the genesis block
    for _, block := range blockchain {
        fmt.Printf("Index: %d\n", block.Index)
        fmt.Printf("Timestamp: %d\n", block.Timestamp)
        fmt.Printf("Student Data: %+v\n", block.Student)
        fmt.Printf("PrevHash: %s\n", block.PrevHash)
        fmt.Printf("Hash: %s\n", block.Hash)
        fmt.Printf("Nonce: %d\n", block.Nonce)
        fmt.Println()
    }
}

