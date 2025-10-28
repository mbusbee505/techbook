
# Command Line Arguments

```rust
use std:: env;
use std:: process;

fn main() {
	let args: Vec<String> = env::args().collect();
	let config = Config::build(&args).unwrap_or_else(|err| {
		println!("Problem parsing arguments: {err}");
		process::exit(1);
	});
	
	let query = config.query;
	let file_path = config.file_path;
}

struct Config {
    query: String,
    file_path: String,
}

impl Config {
	fn build(args: &[String]) -> Result <Config, &'static str> {
		if args.len() < 3 {
			return Err("not enough arguments");
		}
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

