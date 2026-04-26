# ShadowOps Qwen3-1.7B GRPO LoRA Adapter

Source repository:

- `https://github.com/ybaddam8-png/shadowops-hackathon.git`

Source path:

- `backend-ml/training/checkpoints/qwen3_grpo_final_v2/checkpoint-250/`

Files copied for inference and traceability:

- `adapter_model.safetensors`
- `adapter_config.json`
- `config.json`
- `tokenizer.json`
- `tokenizer_config.json`
- `chat_template.jinja`
- `README.md`
- `trainer_state.json`

Files intentionally not copied:

- `optimizer.pt`
- `scheduler.pt`
- `rng_state.pth`
- `training_args.bin`

Those optimizer/runtime files are not required for inference and would add unnecessary repository weight.

Model-improvement claims should be made only after this adapter is evaluated in the final repo and a fresh `model_eval_report.json` or `checkpoint_comparison_report.json` is generated.
