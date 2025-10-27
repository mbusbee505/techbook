
# Command Line Arguments

```rust
use std:: env;

fn main() {
	let args: Vec<String> = env::args().collect();
	let config = read_args(&args);
}

struct Config {
	first: String,
	second: String,
}

fn read_args(args: &[String]) ->  Config {

	let first = &args[1].clone();	
	let second = &args[2].clone();
	
	Config { first, second }
}
```

# Read From File

```rust
use std:fs;

let contents = fs::read_to_string(file_path)
	.expect("Should have been able to read the file");

println!("With text:\n{contents}");
```

