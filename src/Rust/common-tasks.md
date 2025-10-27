
# Command Line Arguments

```rust
use std:: env;

fn main() {
	let args: Vec<String> = env::args().collect();
	let config = Config::new(&args);
	let query = config.query;
	let file_path = config.file_path;
}

struct Config {
    query: String,
    file_path: String,
}

impl Config {
	fn new(args: &[String]) -> Config {
		let query = args[1].clone();
		let file_path = args[2].clone();
		
		Config { query, file_path }
	}
}
```

# Read From File

```rust
use std:fs;

let contents = fs::read_to_string(file_path)
	.expect("Should have been able to read the file");

println!("With text:\n{contents}");
```

