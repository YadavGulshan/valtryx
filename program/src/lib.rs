use anchor_lang::prelude::*;

declare_id!("7BDGJhwVQUhr5jkkm31VNFQUCSnuTa9zukGZX36FD9mj");

#[program]
pub mod valtryx {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, title: String, description: String, decryption_key: String) -> Result<()> {
        let files: &mut Account<Files> = &mut ctx.accounts.files;
        files.title = title;
        files.description = description;
        files.decryption_key = decryption_key;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 * 3)]
    pub files: Account<'info, Files>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Files {
    pub title: String,
    pub description: String,
    pub decryption_key: String,
}
