import os


def main():
    api_file = '/home/destiny/development/to_say/client/src/store/axios.ts'
    index_file = '/home/destiny/development/to_say/client/web-build/index.html'
    os.chdir('/home/destiny/development/to_say/client')
    with open(api_file) as f:
        text = f.read().replace('const hostIndex = 1', 'const hostIndex = 0')
    with open(api_file, 'w') as f:
        f.write(text)

    os.system('expo build:web')

    with open(api_file) as f:
        text = f.read().replace('const hostIndex = 0', 'const hostIndex = 1')
    with open(api_file, 'w') as f:
        f.write(text)

    with open(index_file) as f:
        index_text = f.read().replace('<!doctype html><html lang="en">', '<!doctype html><html lang="ru">')
    with open(index_file, 'w') as f:
        f.write(index_text)

    # os.system('scp -r /home/destiny/development/lab3/frontend/web-build 'pyth
    #           'django@194.58.96.189:/home/django/lab3/frontend/web-build')


if __name__ == '__main__':
    main()
