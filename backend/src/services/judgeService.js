const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class JudgeService {
  constructor() {
    this.tempDir = path.join(__dirname, '../temp');
    this.ensureTempDir();
  }

  async ensureTempDir() {
    try {
      await fs.access(this.tempDir);
    } catch {
      await fs.mkdir(this.tempDir, { recursive: true });
    }
  }

  async executeCode(code, language, input, timeLimit = 2) {
    const executionId = uuidv4();
    const workDir = path.join(this.tempDir, executionId);
    
    try {
      await fs.mkdir(workDir, { recursive: true });
      
      let filePath, runCmd;
      
      if (language === 'javascript') {
        filePath = path.join(workDir, 'solution.js');
        await fs.writeFile(filePath, code);
        runCmd = `node ${filePath}`;
      } else if (language === 'python') {
        filePath = path.join(workDir, 'solution.py');
        await fs.writeFile(filePath, code);
        runCmd = `python3 ${filePath}`;
      } else {
        return { output: 'Language not supported yet', error: true };
      }
      
      const result = await this.executeWithInput(runCmd, input, timeLimit);
      return result;
      
    } catch (error) {
      return { output: error.message, error: true };
    } finally {
      await fs.rm(workDir, { recursive: true, force: true });
    }
  }
  
  executeWithInput(cmd, input, timeLimit) {
    return new Promise((resolve) => {
      const process = exec(cmd, { timeout: timeLimit * 1000 }, (error, stdout, stderr) => {
        if (error) {
          if (error.killed) {
            resolve({ output: 'Time Limit Exceeded', error: true });
          } else {
            resolve({ output: stderr || error.message, error: true });
          }
        } else {
          resolve({ output: stdout.trim(), error: false });
        }
      });
      
      if (input) {
        process.stdin.write(input);
        process.stdin.end();
      }
    });
  }
}

module.exports = new JudgeService();